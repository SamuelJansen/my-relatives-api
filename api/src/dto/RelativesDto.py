class RelativesQueryDto:
    def __init__(self, 
        key= None, 
        name = None
    ):
        self.key = key
        self.name = name


class RelativesQueryAllDto:
    def __init__(self, 
        keyList= None, 
        nameList = None
    ):
        self.keyList = keyList
        self.nameList = nameList


class RelativesResponseDto:
    def __init__(self, 
        key= None, 
        name = None,
        mother = None,
        father = None,
        brotherList = None,
        sisterList = None,
        wife = None,
        husband = None
    ):
        self.key = key
        self.name = name
        self.mother = mother
        self.father = father
        self.brotherList = brotherList
        self.sisterList = sisterList
        self.wife = wife
        self.husband = husband