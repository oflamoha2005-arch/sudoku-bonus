from django.urls import path
from . import views

urlpatterns = [
    path('api/demands/', views.submit_demand, name='submit_demand'),
    path('api/demands/health/', views.health_check, name='health_check'),
]
