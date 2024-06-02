export type ColorType = 'primary' | 'secondary' | 'tertiary' | 'warn' | undefined;

export class Color {
    
    public static getColorClass(colorType: ColorType, component: string): string {
        if(colorType) {
            return colorType + '-' + component + '-color';
        } else {
            return 'primary-' + component + '-color';
        }
    }
}