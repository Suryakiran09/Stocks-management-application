from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import WatchList
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, LoginSerializer, WatchListSerializer
import requests
from collections import defaultdict

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)

class LoginView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username', None)
        password = request.data.get('password', None)
        user = authenticate(username=username, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class WatchListView(generics.ListCreateAPIView):
    serializer_class = WatchListSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return WatchList.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WatchListDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WatchListSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return WatchList.objects.filter(user=self.request.user)

def get_stock_data(symbols):
    base_url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=FCFGTMEA43XTV09J&symbol='
    stock_data = defaultdict(lambda: {'data': []})

    for symbol in symbols:
        url = base_url + symbol
        response = requests.get(url)
        data = response.json()
        print(data)

        if 'Time Series (5min)' in data:
            time_series = data['Time Series (5min)']
            sorted_time_series = sorted(time_series.items(), reverse=True)
            last_8_data_points = sorted_time_series[:8]

            for timestamp, values in last_8_data_points:
                stock_data[symbol]['data'].append({
                    'timestamp': timestamp,
                    'open': float(values['1. open']),
                    'high': float(values['2. high']),
                    'low': float(values['3. low']),
                    'close': float(values['4. close']),
                    'volume': int(values['5. volume'])
                })

    return stock_data

class StockDataView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user_watchlist = WatchList.objects.filter(user=request.user).values_list('stock_symbol', flat=True)
        stock_data = get_stock_data(user_watchlist)
        return Response(stock_data, status=status.HTTP_200_OK)
