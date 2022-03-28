import React, { useState } from "react";
import Upload from './Upload';
import { createNewShop, uploadImage } from '../service/todo';
import "./Modal.css";

const Modal = ({ user, shops, setShops, setLoading }) => {
  const [shopName, setShopName] = useState();
  const [shopDesc, setShopDesc] = useState();
  const [shopContact, setShopContact] = useState();
  const [shopCategories, setShopCategories] = useState([]);
  const [previewSource, setPreviewSource] = useState();

  const onCreateShop = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!previewSource) return;
    await uploadImage(previewSource).then(async (res) => {
      await createNewShop(shopName, shopDesc, shopContact, shopCategories, res.url, user._id)
        .then((response) => {
          setShops([...shops, response]);
          setLoading(false);
        });
    });

  };

  const onAddCategories = (category) => {
    if (shopCategories?.includes(category)) {
      setShopCategories(shopCategories.filter((c) => c !== category));
    } else {
      setShopCategories([...shopCategories, category]);
    }
  };

  return (
    <div>
      <div
        class="hidden overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full modal-backdrop"
        id="large-modal"
      >
        <div class="relative px-4 w-full max-w-4xl h-full md:h-auto">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 mymodal">
            <div class="flex justify-between items-center p-5 rounded-t dark:border-gray-600">
              <h3 class="text-xl font-medium">
                SHOP REQUEST
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white modal-close"
                data-modal-toggle="large-modal"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div class="p-6 space-y-6 modal-wrapper">
              <form className="modal-form">
                <div className="modal-wrapper-left">
                  {/* <label for='name' className="modal-label">Shop Name</label><br/> */}
                  <input type='text' name='name' className="modal-input" placeholder="Shop Name" value={shopName} onChange={e => setShopName(e.target.value)} /><br />
                  {/* <label for='description' className="modal-label">Shop Description</label><br/> */}
                  <textarea type='text' name='description' className="modal-input desc-input" placeholder="Shop Description" value={shopDesc} onChange={e => setShopDesc(e.target.value)} /><br />
                  {/* <label for='contact' className="modal-label">Contact</label><br/> */}
                  <textarea type='text' name='contact' className="modal-input contact-input" placeholder="Shop Contact" value={shopContact} onChange={e => setShopContact(e.target.value)} /><br />
                </div>

                <div className="modal-wrapper-right">
                  <input type="checkbox" id="foods" name="Foods" value="foods" className="modal-checkbox" onClick={() => onAddCategories("Foods")} />
                  <label for="Foods" className="modal-label"> Foods</label><br /><br />
                  <input type="checkbox" id="health" name="health" value="health" className="modal-checkbox" onClick={() => onAddCategories("Health & Cosmetic")} />
                  <label for="health" className="modal-label"> Health & Cosmetic</label><br /><br />
                  <input type="checkbox" id="electronic" name="electronic" value="electronic" className="modal-checkbox" onClick={() => onAddCategories("Electronic")} />
                  <label for="electronic" className="modal-label"> Electronic</label><br /><br />
                  <input type="checkbox" id="clothing" name="clothing" value="clothing" className="modal-checkbox" onClick={() => onAddCategories("Clothing")} />
                  <label for="clothing" className="modal-label"> Clothing</label><br /><br />
                  <input type="checkbox" id="accessories" name="accessories" value="accessories" className="modal-checkbox" onClick={() => onAddCategories("Accessories")} />
                  <label for="accessories" className="modal-label"> Accessories</label><br /><br />
                  <input type="checkbox" id="etc" name="etc" value="etc" className="modal-checkbox" onClick={() => onAddCategories("ETC.")} />
                  <label for="etc" className="modal-label"> ETC.</label><br /><br />

                  {/* TODO:If we can, We will do it later */}
                  {/* <span className="add-img-text">Add Image</span>
                    <input type='file' name='image-input' className="modal-image"/> */}

                </div>
              </form>
              <Upload previewSource={previewSource} setPreviewSource={setPreviewSource} />
            </div>

            <div class="flex items-center p-6 space-x-2 rounded-b border-gray-200 dark:border-gray-600">
              <button
                data-modal-toggle="large-modal"
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 modal-btn"
                onClick={onCreateShop}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
