from python_helper import ObjectHelper, log
from python_framework import Service, ServiceMethod, Serializer, HttpStatus, GlobalException

from dto import RelativesDto


@Service()
class RelativesService:

    @ServiceMethod(requestClass=[RelativesDto.RelativesQueryDto])
    def findRelatives(self, queryDto):
        model = self.repository.relatives.findRelatives(queryDto.name)
        if ObjectHelper.isEmpty(model):
            raise GlobalException(message=f'''Person '{queryDto.name}' does not exists''', status=HttpStatus.BAD_REQUEST)
        dto = RelativesDto.RelativesResponseDto(
            name = model.name,
            father = self.service.person.findPersonByName(model.fatherName),
            mother = self.service.person.findPersonByName(model.motherName),
            wife = self.service.person.findPersonByName(model.wifeName),
            husband = self.service.person.findPersonByName(model.husbandName),
            brotherList = self.service.person.findPersonListByNames(model.brotherNames), 
            sisterList = self.service.person.findPersonListByNames(model.sisterNames)
        )
        return dto

        
        
