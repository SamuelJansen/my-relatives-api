from python_helper import ObjectHelper, log
from python_framework import Service, ServiceMethod, Serializer, HttpStatus, GlobalException

from dto import PersonDto


@Service()
class PersonService:


    @ServiceMethod(requestClass=[PersonDto.PersonQueryDto])
    def findPerson(self, queryDto):
        return self.findPersonByName(queryDto.name)


    @ServiceMethod(requestClass=[str])
    def findPersonByName(self, name):
        if ObjectHelper.isNoneOrBlank(name):
            return None
        model = self.repository.person.findPersonByName(name)
        if ObjectHelper.isEmpty(model):
            raise GlobalException(message=f'''Person '{name}' does not exists''', status=HttpStatus.INTERNAL_SERVER_ERROR)
        dto = PersonDto.PersonResponseDto(
            name = model.name
        )
        return dto


    @ServiceMethod(requestClass=[str])
    def findPersonListByNames(self, names):
        if ObjectHelper.isNoneOrBlank(names):
            return []
        nameList = [
            name.strip()
            for name in names.split(',')
            if ObjectHelper.isNeitherNoneNorBlank(name)
        ]
        responseDtoList = [
            self.findPersonByName(name)
            for name in nameList
        ]
        return responseDtoList

        
        
