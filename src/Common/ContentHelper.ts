import { originalProductsListId } from './Constants';
import { ProductData } from '../Models/Models';

export const ContentHelper = (): ProductData[] => {
    const productsListContainer = document.getElementById(originalProductsListId);
    if (productsListContainer) {
        const productsData: ProductData[] = 
            Object.values(productsListContainer?.children[0].children).map(
                (item, id) => { 
                    const url = item.children[0]?.getAttribute('href');
                    const soundcloudUrlMatch = url!.match(/\/\d-([^/]+)$/);
                    const soundcloudUrl = soundcloudUrlMatch ? soundcloudUrlMatch[1] : '';

                    const imgSrcMatch = item.children[0]?.children[0]?.getAttribute('style')?.match(/url\(([^)]+)\)/);
                    const imgSrc = imgSrcMatch ? imgSrcMatch[1] : '';

                    return { 
                        id,
                        url,
                        soundcloudUrl,
                        imgSrc,
                        title: item.children[0]?.children[1]?.innerHTML,
                    } 
                }
            );
        return productsData.length > 0 ? productsData : [];
    }

    return [];
}

export default ContentHelper;