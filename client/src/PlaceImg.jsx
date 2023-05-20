import * as myConst from "./MyConstant";

export default function PlaceImg({ place, index = 0, classname=null }) {
  if (!place?.photos.length) {
    return "";
  }

  if(!classname)
  {
    classname = 'object-cover'
  }

  return (
    <img
      src={myConst.BACKEND_URL + "uploads/" + place.photos[index]}
      alt=""
      srcset=""
      className={classname}
    />
  );
}
