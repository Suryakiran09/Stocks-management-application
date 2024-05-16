from django.urls import path
from . import views
from rest_framework import permissions

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Stock list API",
        default_version='v1',
        description="API for Stock Listing",
        terms_of_service="https://www.example.com/policies/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('watchlist/', views.WatchListView.as_view(), name='watchlist'),
    path('watchlist/<int:pk>/', views.WatchListDetailView.as_view(), name='watchlist-detail'),
    path('stock-data/', views.StockDataView.as_view(), name='stock-data'),
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]