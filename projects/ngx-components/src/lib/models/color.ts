export type ColorType = 'primary' | 'secondary' | 'tertiary' | 'warn' | undefined;

export class Color {
    public static getColorType(colorType: ColorType): ColorType {
        return colorType || 'primary';
    }
}