import { useState, useCallback } from 'react';

const useEditable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const startEditing = useCallback(() => setIsEditing(true), []);

  return { isEditing, startEditing };
};

export default useEditable;
