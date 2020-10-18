import { black, bgWhite, bgYellow, bgRed } from 'colors/safe';

export const log = (
  (...data: any[]) => {
    const $data = data.map((d) => bgWhite(d));
    const $$data = $data.map((d) => black(d));
  
    console.log();
    console.log(...$$data);
    console.log();
  }
);

export const warn = (
  (...data: any[]) => {
    const $data = data.map((d) => bgYellow(d));
    const $$data = $data.map((d) => black(d));
  
    console.warn();
    console.warn(...$$data);
    console.warn();
  }
);

export const error = (
  (...data: any[]) => {    
    const $data = data.map((d) => bgRed(d));
    const $$data = $data.map((d) => black(d));
  
    console.error();
    console.error(...$$data);
    console.error();
  }
);
