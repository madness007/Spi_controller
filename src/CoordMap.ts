import { Graph, Leaf } from "./Graph.js";

export class Led {

  public address: number;
  public led: number;

  constructor(address: number, led: number) {
    this.address = address;
    this.led = led;
  }

}

export class Coordinate {

  public x: number;
  public y: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  
  isEqual(cor: Coordinate): Boolean {
    return cor.x == this.x && cor.y == this.y;
  }

  Add(cor: Coordinate) {
    this.x += cor.x;
    this.y += cor.y;
  }
}

const sideDistance = [
  new Coordinate(-129, -45),
  new Coordinate(-92, -153),
  new Coordinate(37, -108),
  new Coordinate(129, 45),
  new Coordinate(92, 15),
  new Coordinate(-37, 108),
]

const ledCords: Array<Coordinate> = [
  new Coordinate(-20, -11),
  new Coordinate(-43, -20),
  new Coordinate(-67, -40),
  new Coordinate(-79, -58),
  new Coordinate(-37, -57),
  new Coordinate(-19, -52),
  new Coordinate(8, -30),
  new Coordinate(19, -14),
  new Coordinate(20, 17),
  new Coordinate(33, -31),
  new Coordinate(63, 52),
  new Coordinate(48, 63),
  new Coordinate(15, 62),
  new Coordinate(1, 52),
  new Coordinate(-32, 30),
  new Coordinate(-19, 16),
]

export class CoordMap {

  public coordMap: Map<Coordinate, Led>;

  constructor(graph: Graph) {
    this.coordMap = new Map<Coordinate, Led>();

    var visited: Array<number> = [];

    var vectorMapping = (leaf: Leaf, originCor: Coordinate) => {
      visited.push(leaf.address);

      // Add each led to Map
      ledCords.forEach((cor, index) => {
        let n_cor = cor;
        n_cor.Add(originCor);
        this.coordMap.set(new Coordinate(n_cor.x, n_cor.y), new Led(leaf.address, index));
      });

      leaf.adj.forEach((adjLeaf, side) => {
        if (!visited.includes(adjLeaf.address)) {
          originCor.Add(sideDistance[side - 1]);
          vectorMapping(adjLeaf, originCor);
        }
      });
    };

    vectorMapping(graph.Get(), new Coordinate(0, 0));
  }

}
