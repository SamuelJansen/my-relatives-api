from python_helper import ObjectHelper
from python_framework import Controller, ControllerMethod, HttpStatus, GlobalException


from dto import RelativesDto


@Controller(
    url = '/relatives',
    tag = 'Relatives',
    description = 'Relatives controller'
    , logRequest = True
    , logResponse = True
)
class RelativesController:

    @ControllerMethod(url = '/',
        requestParamClass=[RelativesDto.RelativesQueryDto],
        responseClass=[RelativesDto.RelativesResponseDto]
    )
    def get(self, params):
        return self.service.relatives.findRelatives(params), HttpStatus.OK
