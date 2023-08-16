from python_framework import SqlAlchemyProxy as sap
from python_framework import Repository

from model import Relatives

RELATIVES_DICTIONARY = [
    Relatives.Relatives(
        name = 'Ismael Jansen',
        fatherName =  'Walter Jansen',
        motherName = 'Rosane Adina Schaff Jansen',
        brotherNames = 'Samuel Jansen',
        sisterNames = None,
        wifeName = 'Débora da Rosa Peixoto',
        husbandName = None
    ),
    Relatives.Relatives(
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
    
    def findRelatives(self, name):
        for model in RELATIVES_DICTIONARY:
             if model.name == name:
                return model
    

