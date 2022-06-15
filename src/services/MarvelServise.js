class MarvelServise {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=d8c777e998942e7f7bc4ed3169f3ea17';
    _baseOfset = Math.floor(Math.random() * 1500);


    getResourse = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Не удалось получить ответ от сервера ${url}, статус: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOfset) => {
        const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacters)
    }
    getCharacters = async (id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacters(res.data.results[0])
    }
    _transformCharacters = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description : 'Описание отсутствует', thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelServise;
