export namespace AppRoutes {
  export enum RouteEnum {
    PAINT = 'paint',
    SIGN_IN = 'sign_in',
    SIGN_OUT = 'sign_out',
    AUTH = 'auth',
    CANVAS_CREATE = 'canvas_create',
    SAVED = 'saved_workspaces',
    PROFILE = 'profile_info',
  }
}

export namespace UserModels {
  export namespace Input {
    export interface IInput {
      id: number;
      text: string;
      cordTop: number;
      cordLeft: number;
    }
  }
  export namespace Canvas {
    export interface ICanvas {
      id: number;
      title: string;
      timeCreation: any;
      objects: Array<any>;
      inputs?: Array<Input.IInput>;
    }
  }
  export namespace User {
    export interface IUser {
      id: number;
      email: string;
      nickname: string;
      password: string;
      canvas?: UserModels.Canvas.ICanvas[];
    }
  }
}
