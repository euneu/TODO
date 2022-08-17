// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    containerColor: string;
    bgColor: string;
    accentColor: string;
  }
}
