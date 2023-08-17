from python_helper import ObjectHelper, log
from python_framework import Service, ServiceMethod, Serializer, HttpStatus, GlobalException

from dto import RelativesDto


NOT_SELECTED_RELATIVE = RelativesDto.RelativesResponseDto(
    key = Serializer.newUuidAsString(),
    name = 'Relatives not selected',
    father = None,
    mother = None,
    wife = None,
    husband = None,
    brotherList = [], 
    sisterList = []
)


@Service()
class RelativesService:

    @ServiceMethod(requestClass=[RelativesDto.RelativesQueryDto])
    def findRelatives(self, queryDto):
        if ObjectHelper.isEmpty(queryDto.key) and ObjectHelper.isEmpty(queryDto.name):
            return NOT_SELECTED_RELATIVE
        if ObjectHelper.isNotEmpty(queryDto.key):
            model = self.repository.relatives.findRelativesByKey(queryDto.key)
        else:
            model = self.repository.relatives.findRelativesByName(queryDto.name)
        if ObjectHelper.isEmpty(model):
            raise GlobalException(
                message = f'''Relatives of '{
                    queryDto.key if ObjectHelper.isNeitherNoneNorBlank(queryDto.key) else queryDto.name
                }' wer not created yet''', 
                status = HttpStatus.BAD_REQUEST
            )
        dto = RelativesDto.RelativesResponseDto(
            key = model.key,
            name = model.name,
            father = self.service.person.findPersonByName(model.fatherName),
            mother = self.service.person.findPersonByName(model.motherName),
            wife = self.service.person.findPersonByName(model.wifeName),
            husband = self.service.person.findPersonByName(model.husbandName),
            brotherList = self.service.person.findPersonListByNames(model.brotherNames), 
            sisterList = self.service.person.findPersonListByNames(model.sisterNames)
        )
        return dto

    @ServiceMethod(requestClass=[RelativesDto.RelativesQueryAllDto])
    def findAllRelatives(self, queryAllDto):
        if ObjectHelper.isEmpty(queryAllDto.keyList) and ObjectHelper.isEmpty(queryAllDto.nameList):
            return [NOT_SELECTED_RELATIVE]
        modelList = [
            self.findRelatives(RelativesDto.RelativesQueryDto(
                name = name
            ))
            for name in queryAllDto.nameList
            if ObjectHelper.notEquals(NOT_SELECTED_RELATIVE.name, name)
        ]
        if ObjectHelper.isEmpty(modelList):
            return [NOT_SELECTED_RELATIVE]
        return modelList

        
        
