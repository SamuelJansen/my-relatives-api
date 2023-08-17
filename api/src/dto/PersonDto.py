class PersonQueryDto:
    def __init__(self, 
        key= None, 
        name = None
    ):
        self.key = key
        self.name = name


class PersonQueryAllDto:
    def __init__(self, 
        keyList= None, 
        nameList = None
    ):
        self.keyList = keyList
        self.nameList = nameList


class PersonResponseDto:
    def __init__(self, 
        key= None, 
        name = None
    ):
        self.key = key
        self.name = name