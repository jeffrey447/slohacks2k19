x = "cat"


def catTodog(animal):
    global x
    x = animal
    return x


print(catTodog("dog"))
print(x)
