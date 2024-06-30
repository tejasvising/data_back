a=int(input("Enter a number"))
for i in range(1,a+1):
    print("\n")
    j=a
    while(j>=i):
        if(j%5==0):
            print("#")
        else:
            print("*")
        j--
        