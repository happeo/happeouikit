import { api } from "@universe/frontend-utils";
import { ASSETS_ROOT } from "../constants";

const getUserDetails = user => {
  let fullName = user.fullName;
  let thumbnailPhotoUrl = user.thumbnailPhotoUrl;
  if (typeof fullName !== "string") {
    fullName = user.name.fullName;
  }
  if (!thumbnailPhotoUrl) {
    thumbnailPhotoUrl = `${ASSETS_ROOT}/avatar.png`;
  }
  return {
    id: user.id,
    primaryEmail: user.primaryEmail,
    searchKey: fullName + " " + user.primaryEmail,
    fullName: fullName,
    thumbnailPhotoUrl: thumbnailPhotoUrl,
    isGroup: user.isGroup
  };
};

let mentions = [];
const getUserName = user => user.fullName || user.primaryEmail.split("@")[0];

const getConfig = channelId => ({
  trigger: "@",
  menuItemTemplate: function(item) {
    const { thumbnailPhotoUrl, fullName } = item.original;
    return `    
            <a class="user-mention">
              <img class="user-mention__avatar" src="${thumbnailPhotoUrl}" alt="${fullName}"/>
                <div class="user-mention__name">
                  <p>${fullName}</p>
                </div>
            </a>
          `;
  },
  selectTemplate: function(item) {
    const { id } = item.original;
    // prettier-ignore
    return `<span class="mentioned-user" data-user-id="${id}">@${getUserName(item.original)}</span>`;
  },
  lookup: "searchKey",
  values: async (query, cb) => {
    if (query.length > 0) {
      try {
        let users;
        if (channelId) {
          const resp = await api.channels.findUsers(channelId, { q: query });
          users = resp.data.participants.map(user => getUserDetails(user));
        } else {
          const resp = await api.user.searchUsers(query);
          users = resp.data.map(user => getUserDetails(user));
        }
        mentions = users;
        cb(users);
      } catch (e) {
        console.error("Error searching users", e);
      }
    }
  }
});

export default getConfig;
