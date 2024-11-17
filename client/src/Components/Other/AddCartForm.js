import React, { useContext, useState } from 'react';
import Modal from "react-modal"
import { DetailContext } from '../Provider_and_context/DetailProvider';

function AddCartForm() {

  const [showModal, setShowModal] = useState(false);

  const { handlerMap } = useContext(DetailContext)
  const [name, setName] = useState('');

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (event) => {

    event.preventDefault();
    handlerMap.handleCreate(name);
    resetForm();
    handleCloseModal();
  };

  const resetForm = () => {
    setName('');
  };

  return (
    <div>
      <button onClick={handleOpenModal} className="button">Nový košík</button>
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Jméno košíku: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Vytvořit</button>
        </form>
        <button onClick={handleCloseModal}>Zavřít</button>
      </Modal>
    </div>
  );
};

export default AddCartForm;
