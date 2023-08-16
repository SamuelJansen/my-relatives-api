from python_framework import ResourceManager

from model import ModelAssociation


app = ResourceManager.initialize(__name__, ModelAssociation.MODEL, managerList=[])
