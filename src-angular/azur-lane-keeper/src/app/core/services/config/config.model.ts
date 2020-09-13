export class Config {
  public localMinOffset: number;
  public gameMinOffset: number;
  public enableIdleAnimations: boolean;
  public enableBlur: boolean;
  public sidebarButtons: LinkInfo[];
  public secretaries: SecretaryInfo[];
  public activeSecretaryIdx: number;
  public username: string;
}

export class LinkInfo {
  public label: string;
  public icon: string;
  public url: string;
  public highlighted?: boolean;
}

export class SecretaryInfo {
  public name: string;
  public skin: string;
}
