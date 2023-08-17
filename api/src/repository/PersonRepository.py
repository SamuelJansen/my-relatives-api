from python_framework import SqlAlchemyProxy as sap
from python_framework import Repository, Serializer

from model import Person

PERSON_LIST = [
    Person.Person(
        key = Serializer.newUuidAsString(),
        name = 'Walter Jansen'
    ),
    Person.Person(
        key = Serializer.newUuidAsString(),
        name = 'Rosane Adina Schaff Jansen'
    ),
    Person.Person(
        key = Serializer.newUuidAsString(),
        name = 'Samuel Jansen'
    ),
    Person.Person(
        key = Serializer.newUuidAsString(),
        name = 'Débora da Rosa Peixoto'
    ),
    Person.Person(
        key = Serializer.newUuidAsString(),
        name = 'Ismael Jansen'
    )
]


@Repository()
class PersonRepository:
    
    def findPersonByKey(self, key):
        for person in PERSON_LIST:
             if person.key == key:
                return person
    
    def findPersonByName(self, name):
        for person in PERSON_LIST:
             if person.name == name:
                return person
             
    def findAllPerson(self):
        return [*PERSON_LIST]
    

