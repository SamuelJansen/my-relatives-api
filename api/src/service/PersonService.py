from python_helper import ObjectHelper, log
from python_framework import Service, ServiceMethod, Serializer, HttpStatus, GlobalException

from dto import PersonDto


@Service()
class PersonService:


    @ServiceMethod(requestClass=[PersonDto.PersonQueryDto])
    def findPerson(self, queryDto):
        if ObjectHelper.isNeitherNoneNorBlank(queryDto.key):
            model = self.repository.person.findPersonByKey(queryDto.key)
        else:
            model = self.repository.person.findPersonByName(queryDto.name)
        if ObjectHelper.isEmpty(model):
            raise GlobalException(
                message = f'''Person '{
                    queryDto.key if ObjectHelper.isNeitherNoneNorBlank(queryDto.key) else queryDto.name
                }' does not exists''',  
                status = HttpStatus.INTERNAL_SERVER_ERROR
            )
        dto = PersonDto.PersonResponseDto(
            key = model.key,
            name = model.name
        )
        return dto


    @ServiceMethod(requestClass=[PersonDto.PersonQueryAllDto])
    def findAllPerson(self, queryAllDto):
        if ObjectHelper.isEmpty(queryAllDto.nameList) and ObjectHelper.isEmpty(queryAllDto.keyList):
            modelList = self.repository.person.findAllPerson()
            if ObjectHelper.isEmpty(modelList):
                return []
            return self.findAllPerson(PersonDto.PersonQueryAllDto(
                keyList = [
                    model.key 
                    for model in modelList
                ]
            ))
        return [
            self.findPerson(PersonDto.PersonQueryDto(
                key = key
            ))
            for key in queryAllDto.keyList
        ] if ObjectHelper.isNotEmpty(queryAllDto.keyList) else [
            self.findPerson(PersonDto.PersonQueryDto(
                name = name
            ))
            for name in queryAllDto.nameList
        ]


    @ServiceMethod(requestClass=[str])
    def findPersonByName(self, name):
        if ObjectHelper.isNoneOrBlank(name):
            return None
        return self.findPerson(PersonDto.PersonQueryDto(
            name = name
        ))


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

        
        
