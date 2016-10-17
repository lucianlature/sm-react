/**
 * Created by Lucian on 11/10/2016.
 */

export default class {
  constructor () {
    this.type = 'platform';
  }

  get (id) {
    const fetcher = () =>
      fetch(
        `https://na-synd.foodity.com/api/v3/recipes/${id}?api_key=NMSPDW7WQLRQJ73FDDFFNMEMBSOCLR&fields=recipe_id,title,creation_time,assets,last_edit_time,syndicate&lang=en-US`,
        {
          method: 'post',
          headers: {
            'Cache-Control': 'no-cache'
          },
          timeout: 10000
        }
      )
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            return res.text()
              .then(text => {
                throw new Error(`Platform responded with "${text}" (${res.status}) resource_id=${id}`);
              });
          }
        })
        .catch(err => {
          console.error('Failed getting a platform resouce', err);
          throw err;
        });

    return fetcher().then((get = {}) => get);
  }
}