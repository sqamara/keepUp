
# coding: utf-8

# In[8]:


import numpy as np
import matplotlib.pyplot as plt
#get_ipython().magic('matplotlib inline')
# from scipy.interpolate import griddata
from mpl_toolkits.mplot3d import Axes3D
np.set_printoptions(2)

import json
granularity = 100+1



# In[9]:


grid_x, grid_y = np.mgrid[0:1:(granularity*1j), 0:1:(granularity*1j)]

grid_z = np.empty((granularity,granularity))
grid_z[:] = np.nan

def initYMin(data, start, startFromXMin):
    xRange = range(data.shape[0]) if startFromXMin else range(data.shape[0]-1, -1, -1)
    for i in xRange:
        data[i][0] = start
        start += 1
    return start-1

def initYMax(data, start, startFromXMin):
    xRange = range(data.shape[0]) if startFromXMin else range(data.shape[0]-1, -1, -1)
    for i in xRange:
        data[i][data.shape[1]-1] = start
        start += 1
    return start-1

def initXMin(data, start, startFromYMin):
    yRange = range(data.shape[1]) if startFromYMin else range(data.shape[1]-1, -1, -1)
    for i in yRange:
        data[0][i] = start
        start += 1
    return start-1

def initXMax(data, start, startFromYMin):
    yRange = range(data.shape[1]) if startFromYMin else range(data.shape[1]-1, -1, -1)
    for i in yRange:
        data[data.shape[0]-1][i] = start
        start += 1
    return start-1

# assumes its square
def initXYIntersect(data, start, startFromXMin, startFromYMin):
    xRange = range(data.shape[0]) if startFromXMin else range(data.shape[0]-1, -1, -1)
    yRange = range(data.shape[1]) if startFromYMin else range(data.shape[1]-1, -1, -1)
    for x,y in zip(xRange, yRange):
        data[x][y] = start
        start += 1
    return start-1

start = 1
start = initYMax(grid_z, start, True)
start = initXYIntersect(grid_z, start, False, False)
start = initYMin(grid_z, start, True)
# In[10]:


input_data = [(1,5,1),
(2,5,2),
(3,5,3),
(4,5,4),
(5,5,5),
(4,4,6),
(3,3,7),
(2,2,8),
(1,1,9),
(2,1,10),
(3,1,11),
(4,1,12),
(5,1,13)]


# In[11]:


data = np.empty((5,5))
data[:] = np.nan
for point in input_data:
    data[point[0]-1][point[1]-1] = point[2]


# In[12]:


# return a array of indices with 
def interpolate(data):
    while True: # perform until no updates available
        # find most adjacent and update values
        maxAdjacent = 0
        withMaxAdjacent = []
        for i in range(data.shape[0]):
            for j in range(data.shape[1]):
                if (not np.isnan(data[i][j])):
                    continue
                adjCount = 0
                adjSum = 0
                if (0 < i):
                    if (not np.isnan(data[i-1][j])):
                        adjCount += 1
                        adjSum += data[i-1][j]
    #                     print("#left")
                    if (0 < j):
                        if (not np.isnan(data[i-1][j-1])):
                            adjCount += 1
                            adjSum += data[i-1][j-1]
    #                         print("#top left")
                    if (j < data.shape[1]-1):
                        if (not np.isnan(data[i-1][j+1])):
                            adjCount += 1
                            adjSum += data[i-1][j+1]
    #                         print("#bot left")                
                if (i < data.shape[0]-1):
                    if (not np.isnan(data[i+1][j])):
                        adjCount += 1
                        adjSum += data[i+1][j]
    #                     print("#right")
                    if (0 < j):
                        if (not np.isnan(data[i+1][j-1])):
                            adjCount += 1
                            adjSum += data[i+1][j-1]
    #                         print("#top right")
                    if (j < data.shape[1]-1):
                        if (not np.isnan(data[i+1][j+1])):
                            adjCount += 1
                            adjSum += data[i+1][j+1]
    #                         print("#bot right")
                if (0 < j and not np.isnan(data[i][j-1])):
                    adjCount += 1
                    adjSum += data[i][j-1]
    #                 print("#top")
                if (j < data.shape[1]-1 and not np.isnan(data[i][j+1])):
                    adjCount += 1
                    adjSum += data[i][j+1]
    #                 print("#bot")

                adjAvg = np.nan
                if (0 < adjCount):
                    adjAvg = adjSum/adjCount

                if (adjCount == maxAdjacent):
                    withMaxAdjacent.append((i,j,adjAvg))
                elif (maxAdjacent < adjCount):
                    maxAdjacent = adjCount
                    withMaxAdjacent = [(i,j,adjAvg)]
        
        # no update found exit
        if maxAdjacent == 0:
            break
        
        #perform update
        for point in withMaxAdjacent:
            data[point[0]][point[1]] = point[2]
interpolate(data)
print(data.T)

interpolate(grid_z)
print(grid_z.T)
# In[13]:


#fig = plt.figure()
#ax = fig.gca(projection='3d')
#ax.plot_surface(grid_x, grid_y, data)
#ax.set_xlabel('x')
#ax.set_ylabel('y')
#ax.set_zlabel('z');


def normalize(data):
    maxValue = 0
    for x in range(data.shape[0]):
        for y in range(data.shape[1]):
            maxValue = maxValue if data[x][y] < maxValue else data[x][y]

    for x in range(data.shape[0]):
        for y in range(data.shape[1]):
            data[x][y] = data[x][y]/maxValue

normalize(grid_z)
print(grid_z.T)

def matrixToJson(data, outfile="output.json"):
    retval = {}
    for x in range(data.shape[0]):
        retval[str(x)] = {}
        for y in range(data.shape[1]):
          retval[str(x)][str(y)] = data[x][y]
    with open(outfile, 'w') as fp:
        json.dump(retval, fp)


matrixToJson(grid_z)
