from python_helper import ObjectHelper
from python_framework import Controller, ControllerMethod, HttpStatus, GlobalException


from dto import PersonDto


@Controller(
    url = '/person',
    tag = 'Person',
    description = 'Person controller'
    , logRequest = True
    , logResponse = True
)
class PersonController:

    @ControllerMethod(url = '/',
        requestParamClass=[PersonDto.PersonQueryDto],
        responseClass=[PersonDto.PersonResponseDto]
    )
    def get(self, params):
        return self.service.person.findPerson(params), HttpStatus.OK


@Controller(
    url = '/person',
    tag = 'Person',
    description = 'Person controller'
    , logRequest = True
    , logResponse = True
)
class PersonAllController:

    @ControllerMethod(url = '/all',
        requestParamClass=[PersonDto.PersonQueryAllDto],
        responseClass=[[PersonDto.PersonResponseDto]]
    )
    def get(self, params):
        return self.service.person.findAllPerson(params), HttpStatus.OK
