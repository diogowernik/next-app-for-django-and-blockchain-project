const AddWindowProvider = ({ providers, handleClick: addWindowProvider }) => {
  return (
    // display add provider button if window.ethereum is available
    typeof window !== "undefined" && window.ethereum &&
    providers.size === 0 && (
      <button
        onClick={addWindowProvider}
      >
        <span>
          Add window.ethereum provider as EIP-6963
        </span>
      </button>
    )
  );
};

export default AddWindowProvider;
