import { Injectable } from '@angular/core';
import { Config } from './config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public keyname = 'al_keeper_usrcfg';

  public active: Config;

  constructor() { }

  public load() {
    const existingConfig = window.localStorage.getItem(this.keyname);
    this.active = {
      ...DEFAULT_CONFIG,
      ...JSON.parse(existingConfig || '{}'),
    };
    if (!existingConfig) {
      this.save();
    }
  }

  public save() {
    window.localStorage.setItem(this.keyname, JSON.stringify(this.active));
  }
}

export const DEFAULT_CONFIG: Config = {
  localMinOffset: 480,
  gameMinOffset: -420,
  enableIdleAnimations: true,
  enableBlur: true,
  sidebarButtons: [
    { label: 'AL Facebook', icon: 'fab fa-facebook-square', url: '' },
    { label: 'AL Twitter', icon: 'fab fa-twitter', url: '' },
    { label: 'AL Reddit', icon: 'fab fa-reddit', url: '' },
    { label: 'Email', icon: 'fa fa-envelope', url: '', highlighted: true },
  ],
  secretaries: [
    { name: 'Long Island', skin: 'Default' },
    { name: 'Javelin', skin: 'Default' },
    { name: 'Ayanami', skin: 'Default' },
    { name: 'Laffey', skin: 'Default' },
    { name: 'Z23', skin: 'Default' },
  ],
  activeSecretary: { name: 'Long Island', skin: 'Default' },
  username: 'Shikikan',
};
