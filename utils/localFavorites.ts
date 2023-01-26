const toggleFavorites = (id: number) => { 
    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(id)) { 
        favorites = favorites.filter((item) => item !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}


const existInFavorites = (id: number): boolean => { 
    if(typeof window === 'undefined') return false; // para que no se rompa en el servidor (localStorage no esta definido)
    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(id);
}

const pokemons = ():number[] => {
    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites;
}
export default {
    toggleFavorites,
    existInFavorites,
    pokemons,
}