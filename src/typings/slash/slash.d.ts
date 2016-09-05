interface SlashFn {
	(p: string): string;
}

declare var slashFn: SlashFn;

declare module "slash" {
	export = slashFn
}
