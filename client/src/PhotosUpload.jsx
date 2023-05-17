import axios from "axios";
import * as myConst from "../src/MyConstant";

export default function PhotosUploader({
  photoLink,
  setPhotoLink,
  addedPhotos,
  setAddedPhotos,
}) {

  
  async function addPhotoByLink(event) {
    event.preventDefault();
    if (photoLink != "") {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      setAddedPhotos((prev) => {
        return [...prev, filename];
      });
      setPhotoLink("");
    }
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }
  return (
    <>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(event) => setPhotoLink(event.target.value)}
          placeholder="Add photo using link"
        />
        <button
          onClick={addPhotoByLink}
          className="bg-primary text-white px-6 h-12 rounded-2xl"
        >
          Add&nbsp;Photo
        </button>
      </div>
      <div className="mt-5 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 text-xl text-gray-600">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div key={link}>
              <img
                className="rounded-2xl aspect-square object-cover"
                src={myConst.BACKEND_URL + "uploads/" + link}
                alt="img"
              />
            </div>
          ))}
        <label className="border hover:text-primary bg-transparent rounded-2xl p-8 cursor-pointer flex items-center justify-center gap-1">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}
