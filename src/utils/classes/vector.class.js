export class Vector {
  get x() {
    return this.components[0];
  }

  get y() {
    return this.components[1];
  }

  get z() {
    return this.components[2];
  }
  
  constructor(...components) {
    this.components = components;
  }

  add(v) {
    return new Vector(...this.components.map((c, idx) => c + v[idx]));
  }

  clone() {
    return new Vector(...this.components);
  }
}
