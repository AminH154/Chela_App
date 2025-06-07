import './ChatSkeletons.css';

const ChatSkeletons = () => {
  return (
    <div className="chat-skeletons">
      {[...Array(5)].map((_, idx) => (
        <div
          className={`skeleton-message ${idx % 2 === 0 ? "sender" : "receiver"}`}
          key={idx}
          style={{ "--i": idx }}
        >
          <div className="skeleton-avatar shimmer"></div>
          <div className="skeleton-lines">
            <div className="skeleton-line shimmer"></div>
            <div className="skeleton-line short shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSkeletons;