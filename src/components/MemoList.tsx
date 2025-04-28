import {
  Box,
  Card,
  CardActions,
  CardContent,
  SxProps,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Alert,
  InputLabel,
  MenuItem,
  FormControl,
  InputAdornment,
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Memo } from "../generated";
import { AppDispatch, RootState } from "../store";
import {
  createOrUpdateMemoAction,
  deleteMemoByIdAction,
  getMemosAction,
  searchMemosAction,
} from "../store/memosSlice";


export const MemoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const memos = useSelector((state: RootState) => state.memosSlice.memos);
  const lodaingCounter = useSelector(
    (state: RootState) => state.memosSlice.lodaingCounter
  );
  const [id, setId] = useState<string>("");
  const [user_id, setUserId] = useState<number>(1);
  const [body, setBody] = useState<string>("");
  const [bodyError, setBodyError] = useState<string>("");
  const [bg_color_id, setBgColorId] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [addFlg, setAddFlg] = useState(true);
  const [word, setWord] = useState<string>("");

  const getMemos = async () => {
    dispatch(getMemosAction());
  };
  const deleteMemoById = async () => {
    dispatch(deleteMemoByIdAction(Number(id)));
  };
  const createOrUpdateMemo = async () => {
    dispatch(createOrUpdateMemoAction({ user_id, body, bg_color_id }, id));
  };
  const searchMemos = async () => {
    dispatch(searchMemosAction(word));
  };

  useEffect(() => {
    // getMemos();
    searchMemos();
  }, []);
  const addMemo = () => {
    setOpen(true);
    setId("");
    setBody("");
    setBgColorId(1);
    setAddFlg(true);
  };
  const editMemo = (memo: Memo) => {
    setOpen(true);
    setId(memo.id + "");
    setUserId(memo.user_id);
    setBody(memo.body);
    setBgColorId(memo.bg_color_id);
    setAddFlg(false);
  };
  const handleClose = () => {
    createOrUpdateMemo();
    setOpen(false);
    setId("");
    setBody("");
    setBgColorId(1);
    setBodyError("");
  };
  const handleBlur = (b: string) => {
    if (!b) {
      setBodyError('メモを入力してください');
    } else {
      setBodyError("");
    }
  }
  const handleChange = (event: SelectChangeEvent) => {
    setBgColorId(Number(event.target.value));
  };
  const searchHandleBlur = (w: string) => {
    setWord(w);
    searchMemos();
  };

  return (
    <Box sx={sx.container}>
      <TextField 
        id='word' 
        variant='outlined' 
        placeholder="メモを検索..."
        sx={sx.formTextInput} 
        fullWidth 
        value={word}
        onBlur={e => {searchHandleBlur(e.target.value)}} 
        onChange={e => {setWord(e.target.value)}} 
        InputProps={{
          startAdornment: (
              <InputAdornment position="start">
                  <SearchIcon />
              </InputAdornment>
          ),
        }}
      />
      <IconButton
        aria-label="add"
        onClick={() => {
          addMemo()
        }}
        sx={(theme) => ({
          position: 'absolute',
          left: 40,
          top: 0,
          color: theme.palette.grey[500],
        })}
      >
        <AddIcon />
      </IconButton>
      {memos.map((memo) => (
        <Card key={memo.id} sx={memoCardBg[memo.bg_color_id]}>
          <CardContent sx={sx.memoCardContent}>
            <div onDoubleClick={(e: React.MouseEvent<HTMLDivElement>) => { editMemo(memo) }}><pre>{memo.body_limit}</pre></div>
          </CardContent>
        </Card>
      ))}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        slotProps={{
          paper: {
            component: 'form',
          },
        }}
      >
        {addFlg ? <DialogTitle>メモ登録</DialogTitle> : <DialogTitle>メモ更新</DialogTitle>}
        {!addFlg &&
          <IconButton
            aria-label="delete"
            onClick={() => {
              if (window.confirm("メモを削除しますか？")) {
                deleteMemoById();
                handleClose();
              }
            }}
            sx={(theme) => ({
              position: 'absolute',
              right: 60,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <DeleteIcon />
          </IconButton>
        }
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <TextField 
            id='body' 
            variant='outlined' 
            sx={sx.formTextInput} 
            value={body} 
            fullWidth 
            InputLabelProps={{ shrink: true }} 
            multiline
            rows={5}
            required 
            onChange={e => setBody(e.target.value)}
            onBlur={e => handleBlur(e.target.value)}
          />
          {bodyError && <Alert severity="error">{bodyError}</Alert>}
          <input type='hidden' id='id' name='id' value={id}></input>
          <input type='hidden' id='user_id' name='user_id' value={user_id}></input>
          <Select
            labelId="bg_color_id-label"
            id="bg_color_id"
            name='bg_color_id'
            value={String(bg_color_id)}
            onChange={handleChange}
          >
            <MenuItem value={"1"}><Box sx={sx.selectIconGreen}/></MenuItem>
            <MenuItem value={"2"}><Box sx={sx.selectIconRed}/></MenuItem>
            <MenuItem value={"3"}><Box sx={sx.selectIconBlue}/></MenuItem>
            <MenuItem value={"4"}><Box sx={sx.selectIconYellow}/></MenuItem>
          </Select>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </Box>
  );
};

const sx: { [key: string]: SxProps } = {
  container: {
    margin: 0,
    padding: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  formTextInput: {
    marginBottom: 1,
  },
  formButton: {
    marginTop: 1,
    marginRight: 2,
  },
  memoCardContent: {
    paddingBottom: 0,
  },
  selectIconGreen: {
    width: 20,
    height: 20,
    background: "#dbffb7",
  },
  selectIconRed: {
    width: 20,
    height: 20,
    background: "#ffb7b7",
  },
  selectIconBlue: {
    width: 20,
    height: 20,
    background: "#b7dbff",
  },
  selectIconYellow: {
    width: 20,
    height: 20,
    background: "#ffffb7",
  }
};

const memoCardBg: { [key: number]: SxProps } = {
  1: {backgroundColor: '#dbffb7'},
  2: {backgroundColor: '#ffb7b7'},
  3: {backgroundColor: '#b7dbff'},
  4: {backgroundColor: '#ffffb7'},
};