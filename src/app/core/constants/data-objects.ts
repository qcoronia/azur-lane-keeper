import { FleetFormation } from '../models/entities/fleet-formation.model';

export const BLANK_FORMATION: FleetFormation = {
  name: '',
  main: {
    flagship: { shipName: '', notes: 'flagship'},
    top: { shipName: '', notes: 'top'},
    bottom: { shipName: '', notes: 'bottom'},
    notes: 'main',
  },
  vanguard: {
    lead: { shipName: '', notes: 'lead'},
    middle: { shipName: '', notes: 'middle'},
    last: { shipName: '', notes: 'last'},
    notes: 'vanguard',
  },
  notes: '',
};
