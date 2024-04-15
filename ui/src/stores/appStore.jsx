import { create } from 'zustand';

const useAppStore = create((set) => ({
  modal: {
    show: false,
    onClick: () => {},
    children: <></>,
  },
  setModal: (modal) => set({ modal }),
}));

export default useAppStore;
