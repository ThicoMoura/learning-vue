export default class _Error extends Error {
  __proto__ = Error;

  private _color: string;
  private _icon: string;

  constructor(msg: string, color: string, icon: string) {
    super(msg);
    Object.setPrototypeOf(this, _Error.prototype);
    this.message = msg;
    this._color = color;
    this._icon = icon;
  }

  get color(): string {
    return this._color;
  }

  get icon(): string {
    return this._icon;
  }
}
