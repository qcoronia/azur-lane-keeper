export class FleetFormation {
  public main: {
    flagship: FleetFormationPosition,
    top: FleetFormationPosition,
    bottom: FleetFormationPosition,
    notes: string;
  };
  public vanguard: {
    lead: FleetFormationPosition,
    middle: FleetFormationPosition,
    last: FleetFormationPosition,
    notes: string,
  };
  public notes: string;
}

export class FleetFormationPosition {
  public shipName: string;
  public notes: string;
}
