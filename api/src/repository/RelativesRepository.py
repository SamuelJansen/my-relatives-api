from python_framework import SqlAlchemyProxy as sap
from python_framework import Repository, Serializer

from model import Relatives

RELATIVES_LIST = [
    Relatives.Relatives(
        key = Serializer.newUuidAsString(),
        name = 'Ismael Jansen',
        fatherName =  'Walter Jansen',
        motherName = 'Rosane Adina Schaff Jansen',
        brotherNames = 'Samuel Jansen',
        sisterNames = None,
        wifeName = 'Débora da Rosa Peixoto',
        husbandName = None
    ),
    Relatives.Relatives(
        key = Serializer.newUuidAsString(),
        name = 'Samuel Jansen',
        fatherName =  'Walter Jansen',
        motherName = 'Rosane Adina Schaff Jansen',
        brotherNames = 'Ismael Jansen',
        sisterNames = None,
        wifeName = None,
        husbandName = None
    )
]


@Repository()
class RelativesRepository:
    
    def findRelativesByKey(self, key):
        for model in [*RELATIVES_LIST]:
             if model.key == key:
                return model
             
    def findRelativesByName(self, name):
        for model in [*RELATIVES_LIST]:
             if model.name == name:
                return model
             
    def findAllRelatives(self):
        return [*RELATIVES_LIST]
    

