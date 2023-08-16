from python_framework import SqlAlchemyProxy as sap
from python_framework import Repository

from model import Person

PERSONS_DICTIONARY = [
    Person.Person(
        name = 'Walter Jansen'
    ),
    Person.Person(
        name = 'Rosane Adina Schaff Jansen'
    ),
    Person.Person(
        name = 'Samuel Jansen'
    ),
    Person.Person(
        name = 'Débora da Rosa Peixoto'
    ),
    Person.Person(
        name = 'Ismael Jansen'
    )
]


@Repository()
class PersonRepository:
    
    def findPersonByName(self, name):
        for person in PERSONS_DICTIONARY:
             if person.name == name:
                return person
    

