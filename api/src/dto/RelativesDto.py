class RelativesQueryDto:
    def __init__(self, name = None):
        self.name = name


class RelativesResponseDto:
    def __init__(self, 
        name = None,
        mother = None,
        father = None,
        brotherList = None,
        sisterList = None,
        wife = None,
        husband = None
    ):
        self.name = name
        self.mother = mother
        self.father = father
        self.brotherList = brotherList
        self.sisterList = sisterList
        self.wife = wife
        self.husband = husband