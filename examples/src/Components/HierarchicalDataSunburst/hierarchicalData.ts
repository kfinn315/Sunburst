import { SunburstItemNode } from "../../sunburstLibrary"


export const hierarchicalData: SunburstItemNode = {
  id: 0,
  name: '1',
  color: 0,
  size: 0,
  children: [
    {
      id: 1,
      name: '2',
      color: 515,
      size: 0,
      children: [
        { id: 2, name: '3', color: 2, size: 2 },
        { id: 3, name: '4', color: 121, size: 21 },
        { id: 4, name: '5', color: 241, size: 21 },
        { id: 5, name: '5', color: 341, size: 21 },
        { id: 6, name: '5', color: 441, size: 21 },
        { id: 7, name: '5', color: 541, size: 21 },
        {
          id: 8, name: '5', color: 641, size: 21, children: [{ id: 11, name: '5', color: 341, size: 21 },
          { id: 9, name: '5', color: 441, size: 21 },
          { id: 10, name: '5', color: 541, size: 21 },
          ]
        },
      ],
    },
    {
      id: 12,
      name: '3',
      color: 350,
      size: 0,
      children: [{ id: 13, name: '3', color: 1000, size: 90 }],
    },
  ],
}
