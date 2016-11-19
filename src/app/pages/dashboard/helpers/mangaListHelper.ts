export class MangaListHelper {

	private static instance: MangaListHelper;

	/**
	 * function to get an instance of this class
	 * @return {MangaListHelper}
	 */
	static getInstance(): MangaListHelper {
		MangaListHelper.instance = MangaListHelper.instance || new MangaListHelper();
		return MangaListHelper.instance;
	}

	/**
	 * method to merge manga list and popular manga together
	 * @param popularMangaList {Array}
	 * @param mangaList {Object}
	 * @return {Object}
	 */
	mergePopularAndMangaList(popularMangaList: Array, mangaList: Object, appService: ApplicationService): Object {

		mangaList = mangaList || {};
		popularMangaList = popularMangaList || [];

		for (let i = 0; i < popularMangaList.length; i++) {

			let popularManga = popularMangaList[i];
			let codedName = appService.parseMangaName(popularManga.name);

			popularManga.description = mangaList[codedName].description;

			delete mangaList[codedName];
		}

		for (let key in mangaList) {
			if (mangaList.hasOwnProperty(key)) {

				let manga = mangaList[key];

				popularMangaList.push({
					name: manga.name,
					description: manga.description
				});
			}
		}

		return popularMangaList;
	}

	/**
	 * method to merge manga list and pinned mangas together
	 * @param pinnedMangaList {Array}
	 * @param mangaList {Array}
	 * @return {Array}
	 */
	mergePinnedAndMangaList(pinnedMangaList: Array, mangaList: Array, appService: ApplicationService): Array {

		let list = [];
		if (pinnedMangaList == null || pinnedMangaList.length == 0) {
			return mangaList;
		}

		for (let i = 0; i < pinnedMangaList.length; i++) {
			let manga = appService.getMangaFromList(mangaList, pinnedMangaList[i]);
			if (manga != null) {
				list.push(manga);
				mangaList.remove(manga);
			}
		}

		for (let key in mangaList) {
			if (mangaList.hasOwnProperty(key)) {
				let manga = mangaList[key];
				list.push({
					name: manga.name,
					description: manga.description
				});
			}
		}

		return list;
	}
	
}