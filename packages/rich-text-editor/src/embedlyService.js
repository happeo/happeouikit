const BASE_URL = "https://api.embed.ly/1";

export function extract(inputUrl) {
  const params = {
    key: "12a448a0380548eaa8404c0c8fd00dee",
    secure: true,
    scheme: "https",
    native: true
  };
  if (Array.isArray(inputUrl)) {
    params.urls = inputUrl.join(",");
  } else {
    params.url = inputUrl;
  }

  const query = Object.keys(params)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
  return fetch(`${BASE_URL}/extract?${query}`).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to get embed");
    }
  });
}
