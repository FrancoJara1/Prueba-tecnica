import { useState, useRef } from "react";
import { useArticle } from "../hooks/useArticle";
import { useParams } from "@tanstack/react-router";
import { Button, TextArea } from "@heroui/react";
import { useCurrentUser } from "../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addCommentToArticle,
  updateComment,
  deleteComment,
} from "../services/article.service";

const MAX_LENGTH = 1000;


const first = (value: unknown, fallback = "") =>
  Array.isArray(value) ? (value[0] ?? fallback) : ((value as string) ?? fallback);

const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });
function timeAgo(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const seconds = Math.round((date.getTime() - Date.now()) / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, secs] of units) {
    if (Math.abs(seconds) >= secs) return rtf.format(Math.round(seconds / secs), unit);
  }
  return "justo ahora";
}

function avatarHue(name: string) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) % 360;
  return hash;
}

function Avatar({ name }: { name: string }) {
  return (
    <span
      className="comment-avatar"
      style={{ ["--hue" as string]: avatarHue(name) }}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase() || "U"}
    </span>
  );
}

export default function Comments() {
  const { id } = useParams({ from: "/articles/$id" });
  const { data: article, isLoading: articleLoading } = useArticle(id);
  const { data: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();

  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const addCommentMutation = useMutation({
    mutationFn: (newContent: string) =>
      addCommentToArticle(id, { comment: newContent }),
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["article", id] });
    },
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const refreshArticle = () =>
    queryClient.invalidateQueries({ queryKey: ["article", id] });

  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, text }: { commentId: string; text: string }) =>
      updateComment(id, commentId, { comment: text }),
    onSuccess: () => {
      setEditingId(null);
      setEditContent("");
      refreshArticle();
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(id, commentId),
    onSuccess: () => {
      setConfirmDeleteId(null);
      refreshArticle();
    },
  });

  const startEditing = (commentId: string, current: string) => {
    updateCommentMutation.reset();
    setConfirmDeleteId(null);
    setEditingId(commentId);
    setEditContent(current);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditContent("");
    updateCommentMutation.reset();
  };

  const saveEdit = (commentId: string, original: string) => {
    const text = editContent.trim();
    if (!text || updateCommentMutation.isPending) return;
    if (text === original.trim()) return cancelEditing(); 
    updateCommentMutation.mutate({ commentId, text });
  };

  const canSubmit = content.trim().length > 0 && !addCommentMutation.isPending;

  const submit = () => {
    if (!canSubmit) return;
    addCommentMutation.mutate(content.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      submit();
    }
  };

  if (articleLoading) {
    return (
      <section className="comments-container" aria-busy="true">
        <h3 className="comments-title">Comentarios</h3>
        {[0, 1, 2].map((i) => (
          <div key={i} className="comment-skeleton">
            <span className="skeleton-avatar" />
            <div className="skeleton-lines">
              <span style={{ width: "30%" }} />
              <span style={{ width: "90%" }} />
              <span style={{ width: "60%" }} />
            </div>
          </div>
        ))}
      </section>
    );
  }

  const rawComments = article?.comments ?? article?.data?.comments;
  const commentsList: any[] = Array.isArray(rawComments) ? rawComments : [];

  const currentName = first(currentUser?.name, "Tú");
  const currentId = String(
    currentUser?.id ?? currentUser?._id ?? currentUser?.user?.id ?? ""
  );

  return (
    <section className="comments-container" aria-labelledby="comments-heading">
      <h3 id="comments-heading" className="comments-title">
        Comentarios
        <span className="comments-count">{commentsList.length}</span>
      </h3>

      {currentUser ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <Avatar name={currentName} />
          <div className="comment-form-main">
            <TextArea
              ref={textareaRef}
              aria-label="Escribe tu comentario"
              placeholder="Suma tu opinión a la conversación…"
              value={content}
              maxLength={MAX_LENGTH}
              rows={3}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              className="comment-textarea"
            />
            <div className="comment-form-actions">
              <span
                className="comment-hint"
                data-near-limit={content.length > MAX_LENGTH * 0.9}
              >
                {content.length > 0
                  ? `${content.length}/${MAX_LENGTH}`
                  : "Ctrl + Enter para publicar"}
              </span>
              <Button type="submit" size="sm" isDisabled={!canSubmit}>
                {addCommentMutation.isPending ? "Publicando…" : "Publicar"}
              </Button>
            </div>
            {addCommentMutation.isError && (
              <p className="comment-error" role="alert">
                No se pudo publicar el comentario.{" "}
                {(addCommentMutation.error as Error).message}
              </p>
            )}
          </div>
        </form>
      ) : (
        <p className="comment-login-hint">
          Inicia sesión para participar en la conversación.
        </p>
      )}

      {commentsList.length === 0 ? (
        <div className="empty-comments-box">
          <p className="empty-title">Aún no hay comentarios</p>
          <p className="empty-text">
            Abre la conversación con tu opinión sobre este artículo.
          </p>
          {currentUser && (
            <Button
              size="sm"
              variant="secondary"
              onPress={() => textareaRef.current?.focus()}
            >
              Escribir el primer comentario
            </Button>
          )}
        </div>
      ) : (
        <ul className="comments-list">
          {commentsList.map((comment, index) => {
            const authorName = first(comment.author?.name, "Anónimo");
            const isOwner = Boolean(
              currentId && String(comment.author?.id ?? "") === currentId
            );

            const commentId: string = comment._id;
            const text: string = comment.comment ?? "";
            const isEditing = editingId === commentId;
            const isConfirmingDelete = confirmDeleteId === commentId;
            const isDeleting =
              deleteCommentMutation.isPending &&
              deleteCommentMutation.variables === commentId;

            return (
              <li key={commentId ?? index} className="comment-card">
                <Avatar name={authorName} />

                <div className="comment-main">
                  <div className="comment-header">
                    <strong className="comment-author-name">{authorName}</strong>
                    {isOwner && <span className="comment-badge">Tú</span>}
                    {comment.createdAt && (
                      <time
                        className="comment-date"
                        dateTime={comment.createdAt}
                        title={new Date(comment.createdAt).toLocaleString("es")}
                      >
                        {timeAgo(comment.createdAt)}
                      </time>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="comment-edit">
                      <TextArea
                        aria-label="Editar comentario"
                        autoFocus
                        value={editContent}
                        maxLength={MAX_LENGTH}
                        rows={3}
                        onChange={(e) => setEditContent(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") cancelEditing();
                          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                            e.preventDefault();
                            saveEdit(commentId, text);
                          }
                        }}
                        className="comment-textarea"
                      />
                      <div className="comment-form-actions">
                        <span className="comment-hint">
                          Ctrl + Enter para guardar · Esc para cancelar
                        </span>
                        <div className="comment-inline-buttons">
                          <Button
                            size="sm"
                            variant="ghost"
                            onPress={cancelEditing}
                            isDisabled={updateCommentMutation.isPending}
                          >
                            Cancelar
                          </Button>
                          <Button
                            size="sm"
                            onPress={() => saveEdit(commentId, text)}
                            isDisabled={
                              !editContent.trim() || updateCommentMutation.isPending
                            }
                          >
                            {updateCommentMutation.isPending
                              ? "Guardando…"
                              : "Guardar cambios"}
                          </Button>
                        </div>
                      </div>
                      {updateCommentMutation.isError && (
                        <p className="comment-error" role="alert">
                          No se pudo guardar el cambio.{" "}
                          {(updateCommentMutation.error as Error).message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="comment-body">{text}</p>
                  )}

                  {isOwner && !isEditing && (
                    <>
                      {isConfirmingDelete ? (
                        <div className="comment-confirm" role="alertdialog">
                          <span>¿Eliminar este comentario? No se puede deshacer.</span>
                          <div className="comment-inline-buttons">
                            <Button
                              size="sm"
                              variant="ghost"
                              onPress={() => setConfirmDeleteId(null)}
                              isDisabled={isDeleting}
                            >
                              Cancelar
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onPress={() => deleteCommentMutation.mutate(commentId)}
                              isDisabled={isDeleting}
                            >
                              {isDeleting ? "Eliminando…" : "Sí, eliminar"}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="comment-actions">
                          <Button
                            variant="ghost"
                            size="sm"
                            onPress={() => startEditing(commentId, text)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onPress={() => {
                              cancelEditing();
                              deleteCommentMutation.reset();
                              setConfirmDeleteId(commentId);
                            }}
                          >
                            Eliminar
                          </Button>
                        </div>
                      )}
                      {deleteCommentMutation.isError &&
                        deleteCommentMutation.variables === commentId && (
                          <p className="comment-error" role="alert">
                            No se pudo eliminar el comentario.{" "}
                            {(deleteCommentMutation.error as Error).message}
                          </p>
                        )}
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}