export const CATEGORY_SLUGS = [
	'devlog',
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export interface Category {
	slug: CategorySlug;
	name: string;
	description: string;
}

export const CATEGORIES: Category[] = [
	{
		slug: 'devlog',
		name: '개발일지',
		description: '개발 과정과 프로젝트 기록을 정리합니다.',
	},
];