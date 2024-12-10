export interface DocMeta {
	filename: string;
	text: string;
	references: DocMeta[];
}

export interface Source {
	doc: DocMeta;
	start: number;
	end: number;
}
